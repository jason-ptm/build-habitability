export interface NodeInterface {
  name: string;
  group: number;
}

export interface LinkInterface {
  source: number;
  target: number;
  value: number;
}

export interface GraphInterface {
  layout: any;
  data: any;
  temperature: number;
}
