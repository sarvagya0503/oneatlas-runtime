export type Field = {
  id: string;
  name: string;
  type: string;
};

export type Component = {
  id: string;
  type: string;
  title: string;
  fields?: Field[];
};

export type AppSchema = {
  pages: {
    id: string;
    name: string;
    components: Component[];
  }[];
};

export type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: "Simple" | "Moderate" | "Advanced";
  tags: string[];
  schema: AppSchema;
};