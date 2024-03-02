import axios, { AxiosInstance } from "axios";
import { environment } from "../environment/environment";

interface IIncome {
  name: string;
  ammount: string;
  method: "credit_card" | "debit_card" | "card" | "pix" | "money";
  date: Date;
  category: null | string;
  isLoan: boolean;
  isInvestment: boolean;
}

export class IncomesServices {
  private axios_instance: AxiosInstance | null = null;

  constructor() {
    this.axios_instance = axios.create({
      baseURL: String(environment.apiUrl),
    });
  }

  async getIncomes() {
    try {
      const result = await this.axios_instance?.get("incomes/");
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async getIncome(id: string) {
    try {
      const result = await this.axios_instance?.get(`incomes/${id}`);
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async registerIncome(income: IIncome) {
    try {
      const result = await this.axios_instance?.post("incomes/", {
        income
      });
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async updateIncome(id: string, income: IIncome) {
    try {
      const result = await this.axios_instance?.patch(`incomes/${id}`, {
        income
      });
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }

  async deleteIncome(id: string) {
    try {
      const result = await this.axios_instance?.delete(`incomes/${id}`);
      return result;
    } catch (err: Error | any) {
      console.log(err);
      return { err: err || err.msg };
    }
  }
}
