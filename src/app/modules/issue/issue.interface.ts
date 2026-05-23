export type TIssueType =
  | "bug"
  | "feature_request";

export type TIssueStatus =
  | "open"
  | "in_progress"
  | "resolved";

export interface ICreateIssue {
  title: string;
  description: string;
  type: TIssueType;
}

export interface IUpdateIssue {
  title?: string;
  description?: string;
  type?: TIssueType;
}

export interface IIssue {
  id: number;
  title: string;
  description: string;
  type: TIssueType;
  status: TIssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IReporter {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
}

export interface IIssueWithReporter {
  id: number;
  title: string;
  description: string;
  type: TIssueType;
  status: TIssueStatus;
  reporter: IReporter | null;
  created_at: Date;
  updated_at: Date;
}