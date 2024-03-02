import axios, { AxiosInstance } from "axios";
import { environment } from "../environment/environment";

export interface IExpense {
  name: string;
  ammount: number;
  method: "credit_card" | "debit_card" | "card" | "pix" | "money";
  date: string;
  category: null | string;
  dueDate: null | string;
  hasInstallments: boolean;
  installments: null | number;
}

export class ExpensesServices {
  private axios_instance: AxiosInstance | null = null;

  constructor() {
    this.axios_instance = axios.create({
      baseURL: String(environment.apiUrl),
    });
  }

  async getExpenses() {
    try {
      const result = await this.axios_instance?.get("expenses/");
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async getExpense(id: string) {
    try {
      const result = await this.axios_instance?.get(`expenses/${id}`);
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async registerExpense(expense: IExpense) {
    try {
      const result = await this.axios_instance?.post("expenses/", {
        expense
      });
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async updateExpense(id: string, expense: IExpense) {
    try {
      const result = await this.axios_instance?.patch(`expenses/${id}`, {
        expense
      });
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async deleteExpense(id: string) {
    try {
      const result = await this.axios_instance?.delete(`expenses/${id}`);
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }
}
