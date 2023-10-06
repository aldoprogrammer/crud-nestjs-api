/* eslint-disable prettier/prettier */
// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryInput, FindCategoryInput, UpdateCategoryInput } from './inputs/category.input';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>){}

    async findAll(): Promise<Category[]>{
        return this.categoryModel.find().exec();
    }
    
    async create(createCat: CategoryInput): Promise<Category>{
        const cat = new this.categoryModel(createCat);
        return cat.save();
    }

    async findOne(cat: FindCategoryInput): Promise<Category>{
        return this.categoryModel.findById(cat.id); // Change _id to id
    }

    async update(updateCat: UpdateCategoryInput): Promise<Category>{
        const cat = await this.categoryModel.findOne({ _id: new Types.ObjectId(updateCat._id) }); // Change Types.ObjectId(updateCat._id) to new Types.ObjectId(updateCat._id)
        cat.name = updateCat.name;
        cat.updateAt = new Date();
        return cat.save();
    }

    async deleteCategory(_id: string): Promise<any>{
        return await this.categoryModel.deleteOne({ _id: new Types.ObjectId(_id) }); // Change Types.ObjectId(_id) to new Types.ObjectId(_id)
    }
}
