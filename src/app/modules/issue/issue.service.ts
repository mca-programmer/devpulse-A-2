import { pool } from "../../config/db";
import { AuthRequest } from "../../middleware/auth";
import {
  ICreateIssue,
  IIssue,
  IIssueWithReporter,
  IReporter,
  IUpdateIssue,
} from "./issue.interface";

export const createIssue = async (
  payload: ICreateIssue,
  reporterId: number
): Promise<IIssue> => {
  const { title, description, type } =
    payload;

  const query = `
    INSERT INTO issues
    (
      title,
      description,
      type,
      reporter_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    title,
    description,
    type,
    reporterId,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0] as IIssue;
};

export const getAllIssues = async (
  sort = "newest",
  type?: string,
  status?: string
): Promise<IIssueWithReporter[]> => {
  let query = "SELECT * FROM issues";
  const values: string[] = [];
  const conditions: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(
      `type = $${values.length}`
    );
  }

  if (status) {
    values.push(status);
    conditions.push(
      `status = $${values.length}`
    );
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(
      " AND "
    )}`;
  }

  query += ` ORDER BY created_at ${
    sort === "oldest" ? "ASC" : "DESC"
  }`;

  const issueResult = await pool.query(
    query,
    values
  );

  const issues =
    issueResult.rows as IIssue[];

  const reporterIds = [
    ...new Set(
      issues.map(
        (issue) => issue.reporter_id
      )
    ),
  ];

  let reporters: IReporter[] = [];

  if (reporterIds.length > 0) {
    const reporterQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `;

    const reporterResult =
      await pool.query(reporterQuery, [
        reporterIds,
      ]);

    reporters =
      reporterResult.rows as IReporter[];
  }

  return issues.map((issue) => {
    const reporter =
      reporters.find(
        (r) =>
          r.id === issue.reporter_id
      ) || null;

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter,
      created_at:
        issue.created_at,
      updated_at:
        issue.updated_at,
    };
  });
};

export const getSingleIssue =
  async (
    id: number
  ): Promise<IIssueWithReporter> => {
    const issueQuery =
      "SELECT * FROM issues WHERE id = $1";

    const issueResult =
      await pool.query(issueQuery, [id]);

    const issue =
      issueResult.rows[0] as
        | IIssue
        | undefined;

    if (!issue) {
      throw new Error(
        "Issue not found"
      );
    }

    const reporterQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = $1
    `;

    const reporterResult =
      await pool.query(
        reporterQuery,
        [issue.reporter_id]
      );

    const reporter =
      reporterResult.rows[0] ||
      null;

    return {
      id: issue.id,
      title: issue.title,
      description:
        issue.description,
      type: issue.type,
      status: issue.status,
      reporter,
      created_at:
        issue.created_at,
      updated_at:
        issue.updated_at,
    };
  };

export const updateIssue =
  async (
    id: number,
    payload: IUpdateIssue,
    user: AuthRequest["user"]
  ): Promise<IIssue> => {
    const issueResult =
      await pool.query(
        "SELECT * FROM issues WHERE id = $1",
        [id]
      );

    const issue =
      issueResult.rows[0] as
        | IIssue
        | undefined;

    if (!issue) {
      throw new Error(
        "Issue not found"
      );
    }

    if (
      user?.role ===
      "contributor"
    ) {
      if (
        issue.reporter_id !==
        user.id
      ) {
        throw new Error(
          "You can only update your own issue"
        );
      }

      if (
        issue.status !==
        "open"
      ) {
        throw new Error(
          "You can only edit open issues"
        );
      }
    }

    const updatedTitle =
      payload.title ||
      issue.title;

    const updatedDescription =
      payload.description ||
      issue.description;

    const updatedType =
      payload.type ||
      issue.type;

    const query = `
      UPDATE issues
      SET
        title = $1,
        description = $2,
        type = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;

    const values = [
      updatedTitle,
      updatedDescription,
      updatedType,
      id,
    ];

    const result =
      await pool.query(
        query,
        values
      );

    return result.rows[0] as IIssue;
  };

export const deleteIssue =
  async (
    id: number
  ): Promise<void> => {
    const issueResult =
      await pool.query(
        "SELECT * FROM issues WHERE id = $1",
        [id]
      );

    if (
      issueResult.rows.length ===
      0
    ) {
      throw new Error(
        "Issue not found"
      );
    }

    await pool.query(
      "DELETE FROM issues WHERE id = $1",
      [id]
    );
  };