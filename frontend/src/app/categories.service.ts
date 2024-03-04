import axios, { AxiosInstance } from "axios";
import { environment } from "../environment/environment";
import { Injectable } from "@angular/core";

interface ICategory {
  name: string;
  color: string;
}

@Injectable({providedIn: 'root'})
export class CategoriesServices {
  private axios_instance: AxiosInstance | null = null;

  constructor() {
    this.axios_instance = axios.create({
      baseURL: String(environment.apiUrl),
    });
  }

  async getCategories() {
    try {
      const result = await this.axios_instance?.get("categories/");
      return result;
    } catch (err: Error | any) {
      return { err: err || err.msg };
    }
  }

  async getCategory(id: string) {
    try {
      const result = await this.axios_instance?.get(`categories/${id}`);
      return result;
    } catch (err: Error | any) {
      return { err: err || err.msg };
    }
  }

  async registerCategory(category: ICategory) {
    try {
      const result = await this.axios_instance?.post("categories/", {
        category
      });
      return result;
    } catch (err: Error | any) {
      return { err: err || err.msg };
    }
  }

  async updateCategory(id: string, category: ICategory) {
    try {
      const result = await this.axios_instance?.patch(`categories/${id}`, {
        category
      });
      return result;
    } catch (err: Error | any) {
      return { err: err || err.msg };
    }
  }

  async deleteCategory(id: string) {
    try {
      const result = await this.axios_instance?.delete(`categories/${id}`);
      return result;
    } catch (err: Error | any) {
      return { err: err || err.msg };
    }
  }
}
