/* eslint-disable prettier/prettier */
// src/category/category.resolver.ts
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryInput, FindCategoryInput, UpdateCategoryInput } from './inputs/category.input';
import  {CategoryDto } from './dto/category.dto';


@Resolver()
export class CategoryResolver {
    constructor(private categoryService: CategoryService) {}

    @Query(() => [CategoryDto])
    async categories() {
        return this.categoryService.findAll();
    }

    @Mutation(() => CategoryDto)
    async createCategory(@Args('input') input: CategoryInput) {
        return this.categoryService.create(input); // Use create method instead of findOne
    }

    @Query(() => CategoryDto)
    async findCategory(@Args('input') input: FindCategoryInput) {
        return this.categoryService.findOne(input);
    }

    @Mutation(() => CategoryDto)
    async updateCategory(@Args('input') input: UpdateCategoryInput) {
        return this.categoryService.update(input);
    }

    @Mutation(() => String)
    async deleteCategory(@Args('input') input: FindCategoryInput): Promise<string> {
        await this.categoryService.deleteCategory(input.id); // Change _id to id
        return "Cat Removed";
    }
}
