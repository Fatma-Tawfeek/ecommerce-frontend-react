import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query GetProducts {
        products {
            id
            name
            inStock
            gallery
            prices {
                amount
                currency {
                    symbol
                }
            }
        }
    }
`;

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
        }
    }
`;

export const GET_CATEGORY_PRODUCTS = gql`
    query GetProductsByCategory($categoryId: Int!) {
        productsByCategory(categoryId: $categoryId) {
            categoryName
            products {
                id
                name
                inStock
                gallery
                prices {
                    amount
                    currency {
                        symbol
                    }
                }
            }
        }
    }
`;
