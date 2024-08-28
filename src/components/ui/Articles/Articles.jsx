/* eslint-disable import/no-extraneous-dependencies */
import { Pagination } from "antd";

import ArticleMinimized from "../ArticleMinimized";

export default function Articles() {
  return (
    <>
      <ArticleMinimized />
      <ArticleMinimized />
      <ArticleMinimized />
      <ArticleMinimized />
      <ArticleMinimized />
      <Pagination
        defaultCurrent={1}
        defaultPageSize={5}
        total={20}
        align="center"
        style={{ marginBottom: "16px" }}
      />
    </>
  );
}
