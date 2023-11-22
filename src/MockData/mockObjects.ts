
export interface Recipe {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    tags: string[];
    reviews: Review[];
}

export interface Review {
    rating: number;
    comment: string;
}

export const mockRecipes: Recipe[] = [
    {
        id: 1,
        name: 'Pasta',
        imageUrl: 'https://images.unsplash.com/photo-1599684109957-9c5c7a5b8c9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        description: 'This is a description',
        ingredients: ['pasta', 'sauce', 'cheese'],
        instructions: ['cook', 'eat'],
        tags: ['italian', 'pasta'],
        reviews: [
            {
                rating: 5,
                comment: 'This is a comment'
            }
        ]
    },
    {
        id: 2,
        name: 'Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1599684109957-9c5c7a5b8c9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        description: 'This is a description',
        ingredients: ['dough', 'sauce', 'cheese'],
        instructions: ['cook', 'eat'],
        tags: ['italian', 'pizza'],
        reviews: [
            {
                rating: 5,
                comment: 'This is a comment'
            }
        ]
    },
]