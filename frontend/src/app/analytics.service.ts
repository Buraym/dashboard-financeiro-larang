import axios, { AxiosInstance } from "axios";
import { environment } from "../environment/environment";
import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class AnalyticsServices {
  private axios_instance: AxiosInstance | null = null;

  constructor() {
    this.axios_instance = axios.create({
      baseURL: String(environment.apiUrl),
    });
  }

  async getStatsMonth() {
    try {
      const result = await this.axios_instance?.get("analytics/");
      return result!.data;
    } catch (err: Error | any) {
      return { err: err || err.msg };
    }
  }
}
