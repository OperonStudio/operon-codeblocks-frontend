export interface Condition {
  id: string;
  attribute: string;
  operator: string;
  values: string[];
}

export interface Decision {
  id: string;
  label: string;
  priority: number;
  matchType: "ANY" | "ALL";
  conditions: Condition[];
  outcome: "Visible" | "Invisible";
}
