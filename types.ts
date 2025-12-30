export interface StyleOption {
  id: string;
  category: string;
  name: string;
  description: string;
  promptPart: string;
  previewImage: string; // URL for the sketch/preview
  tags: string[];
}

export interface GenerationRequest {
  image: string; // Base64
  style: StyleOption;
}

export interface GenerationResponse {
  url: string;
}

// Volcengine API Types
export interface VolcengineResponse {
  data: {
    url: string;
    b64_json?: string;
  }[];
  created: number;
  id: string;
}
