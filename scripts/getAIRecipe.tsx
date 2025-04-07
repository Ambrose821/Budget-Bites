import OpenAI from 'openai';
import { ChatCompletionCreateParams } from 'openai/resources';
import type { ChatCompletionTool } from 'openai/resources/chat/completions';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPEN_AI_KEY,
});

const IngredientSchema = z.object({
  item: z.string(),
  cost: z.string(),
});

// Zod schema for meal
const MealSchema = z.object({
  id: z.string(),
  name: z.string(),
  totalCost: z.string(),
  ingredients: z.array(IngredientSchema),
  servings: z.number(),
  instructions: z.string(),
  image_url: z.string(),
  type: z.string(),
});

const ResponseSchema = z.object({
  meal: MealSchema,
});
export type Meal = z.infer<typeof MealSchema>;

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_meal_recipes',
      description: 'Generates meal recipes based on user constraints.',
      parameters: {
        type: 'object',
        properties: {
          maxTotalPrice: { type: 'number', description: 'Maximum total cost in dollars.' },
          desiredServings: { type: 'number', description: 'Desired servings count.' },
          dietaryPreference: {
            type: 'string',
            enum: ['vegan', 'vegetarian', 'omnivore'],
            description: 'Dietary preference for the meal.',
          },
          description: {
            type: 'string',
            description: "A user's optional preferences for the meal to consider",
          },
        },
        required: ['maxTotalPrice', 'desiredServings', 'dietaryPreference'],
      },
    },
  },
];

export async function getAIRecipe({
  maxTotalPrice,
  desiredServings,
  dietaryPreference,
  description = '',
}: {
  maxTotalPrice: number;
  desiredServings: number;
  dietaryPreference: string;
  description: string;
}): Promise<Meal | null> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert recipe generator. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: `
  Generate 1 meal recipes based on the following parameters:
  - Max total price: $${maxTotalPrice}
  - Desired servings: ${desiredServings}
  - Dietary preference: ${dietaryPreference}
  - Additional preferences: ${description}
  
  The response must never include any dollar signs for monetary values **must be valid JSON** in this format:
  {
    "meal": 
      {
        "id": "unique-id",
        "name": "Meal name",
        "totalCost": "string number",
        "ingredients": [
          { "item": "ingredient name and approximate quantity", "cost": "string number" }
        ],
        "servings": number,
        "instructions": "short step-by-step instructions",
        "image_url": "leave as empty string",
        "type": "leave as ${dietaryPreference}"
       
      },
      
    
  }
  
  Do not add any extra text, explanations, or markdown. Only return valid JSON!
            `,
        },
      ],
    });
    const raw = response.choices[0].message.content?.trim() ?? '';

    const jsonArr = JSON.parse(raw);
    // console.log('Parsed JSON:', jsonArr);
    // const parsedArgs = JSON.parse(toolCall.function.arguments);
    // console.log(parsedArgs);

    const validation = ResponseSchema.safeParse(jsonArr);

    if (!validation.success) {
      console.error('Validation error:', validation.error);
      return null;
    }
    let imageUrl = await getMealImageFromName(validation.data.meal.name);
    console.log('DALLE URL AFTER CALL: ', imageUrl);

    if (!imageUrl) {
      imageUrl =
        'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg';
    }
    validation.data.meal['image_url'] = imageUrl;
    validation.data.meal['id'] = String(Date.now());

    return validation.data.meal;
  } catch (err) {
    console.log('OpenAI API error:', err);
    return null;
  }
}
const getMealImageFromName = async (mealName: string): Promise<string | undefined> => {
  try {
    const response = await openai.images.generate({
      prompt: `Stock image of ${mealName}, professional food photography, isolated on white background`,
      n: 1,
      size: '512x512',
    });

    const url = response.data[0].url;
    console.log('DALLE RES: ', response);
    if (url && url != undefined) {
      return url as string;
    }
    return 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg';
  } catch (err) {
    console.log('DALL-E Error', err);
    return 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg';
  }
};
