import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
  mapboxToken: string;
  stripeToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Loads the configuration from the config.json file
   * This should be called before the app initializes
   */
  async loadConfig(): Promise<void> {
    try {
      // Fetch config.json from assets folder
      // Add timestamp to prevent caching issues
      this.config = await firstValueFrom(
        this.http.get<AppConfig>(`/a-deux-pas/assets/config.json?t=${Date.now()}`)
      );
    } catch (error) {
      console.error('Failed to load configuration:', error);
      throw error;
    }
  }

  /**
   * Returns the loaded configuration
   * Throws an error if config hasn't been loaded yet
   */
  getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded. Call loadConfig() first.');
    }
    return this.config;
  }

  /**
   * Gets the API URL from the configuration
   */
  get apiUrl(): string {
    return this.getConfig().apiUrl;
  }

  /**
   * Gets the Mapbox token from the configuration
   */
  get mapboxToken(): string {
    return this.getConfig().mapboxToken;
  }

  /**
   * Gets the Stripe token from the configuration
   */
  get stripeToken(): string {
    return this.getConfig().stripeToken;
  }
}
