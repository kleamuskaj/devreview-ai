import { useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const samples = {

  csharp: `public class UserService
{
    private string connectionString =
        "Server=prod;Password=admin123";

    public User GetUser(int id)
    {
        var query =
            "SELECT * FROM Users WHERE Id = " + id;

        return db.Execute(query);
    }
}`,

  python: `class OrderService:

    def get_orders(self, users):

        result = []

        for user in users:

            orders =
                database.get_orders(user.id)

            for order in orders:

                customer =
                    database.get_customer(
                        order.customer_id
                    )

                product =
                    database.get_product(
                        order.product_id
                    )

                result.append({
                    "order":order,
                    "customer":customer,
                    "product":product
                })

        return result`
};

function App() {

  const [code, setCode] =
    useState(samples.csharp);

  const [review, setReview] =
    useState("");

  const [language, setLanguage] =
    useState("csharp");

  const [focus, setFocus] =
    useState("security");

  const [loading, setLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

const runReview = async () => {

  setReview("");
  setLoading(true);

  try {

    const response =
      await fetch(
        "https://devreview-ai-h5ow.onrender.com/review",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            code,
            language,
            focus
          })
        }
      );

    const data =
      await response.json();

    setReview(data.review);

  }
  catch(err)
  {
    setReview(
      "Failed to fetch review."
    );
  }

  setLoading(false);
};

  return (

    <div
      style={{
        background: "#0B1120",

        minHeight: "100vh",

        padding: "50px",

        boxSizing: "border-box"
      }}
    >

      <div
        style={{

          display: "flex",

          width: "100%",

          height: "calc(100vh - 100px)",

          borderRadius: "28px",

          overflow: "hidden",

          background: "#111827",

          border: "1px solid #1F2937",

          boxShadow:
            "0 25px 70px rgba(0,0,0,.55)"
        }}
      >
        <div
          style={{
            width: "45%",

            background: "#0D1117",

            borderRight:
              "1px solid #1F2937"
          }}
        >

          <Editor
            height="100vh"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(v) =>
              setCode(v ?? "")
            }
          />

        </div>

        <div
          style={{

            width: "55%",

            padding: "38px",

            overflow: "auto",

            background: "#111827",

            color: "#E5E7EB",

            minWidth: 0,

            boxSizing: "border-box",

            overflowWrap: "anywhere",

            wordBreak: "break-word"
          }}
        >

          <div
            style={{

              display: "flex",

              gap: "14px",

              marginBottom: "32px",

              alignItems: "center",

              flexWrap: "wrap"
            }}
          >

            <select
              style={{

                padding: "10px 16px",

                background: "#1F2937",

                color: "#E5E7EB",

                border: "1px solid #374151",

                borderRadius: "12px",

                cursor: "pointer",

                fontSize: "14px"
              }}
              value={language}
              onChange={(e) => {

                const lang =
                  e.target.value;

                setLanguage(lang);

                setCode(
                  samples[
                  lang as keyof typeof samples
                  ] ?? ""
                );
              }}
            >

              <option value="csharp">
                C#
              </option>

              <option value="python">
                Python
              </option>

            </select>

            <select
              style={{

                padding: "10px 16px",

                background: "#1F2937",

                color: "#E5E7EB",

                border: "1px solid #374151",

                borderRadius: "12px",

                cursor: "pointer",

                fontSize: "14px"
              }}
              value={focus}
              onChange={(e) =>
                setFocus(
                  e.target.value
                )
              }
            >

              <option value="security">
                Security
              </option>

              <option value="performance">
                Performance
              </option>

              <option value="clean architecture">
                Clean Architecture
              </option>

              <option value="maintainability">
                Maintainability
              </option>

            </select>

            <button
              onClick={runReview}
              style={{

                padding: "12px 22px",

                background: "#2563EB",

                color: "white",

                border: "none",

                borderRadius: "12px",

                cursor: "pointer",

                fontWeight: 600,

                boxShadow:
                  "0 8px 24px rgba(37,99,235,.35)"
              }}
              disabled={loading}
            >
              {
                loading
                  ? "Reviewing..."
                  : "Review Code"
              }
            </button>

            <button
              style={{

                padding: "12px 18px",

                background: "#1F2937",

                color: "#E5E7EB",

                border: "1px solid #374151",

                borderRadius: "12px",

                cursor: "pointer"
              }}
              onClick={() => {

                navigator.clipboard
                  .writeText(review);

                setCopied(true);

                setTimeout(
                  () => setCopied(false),
                  1500
                );

              }}

            >

              {
                copied
                  ? "Copied ✓"
                  : "Copy Review"
              }

            </button>

            <button
              style={{

                padding: "12px 18px",

                background: "#1F2937",

                color: "#E5E7EB",

                border: "1px solid #374151",

                borderRadius: "12px",

                cursor: "pointer"
              }}
              onClick={() => {

                const blob =
                  new Blob(
                    [review],
                    {
                      type:
                        "text/markdown"
                    }
                  );

                const url =
                  URL.createObjectURL(
                    blob
                  );

                const a =
                  document.createElement(
                    "a"
                  );

                a.href = url;

                a.download =
                  "review.md";

                a.click();

                URL.revokeObjectURL(
                  url
                );

              }}

            >

              Export MD

            </button>

          </div>

          <div
            style={{

              background: "#0D1117",

              border: "1px solid #1F2937",

              borderRadius: "18px",

              padding: "32px",

              color: "#E5E7EB",

              lineHeight: "1.9"
            }}
          >

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{

                h1: ({ children }) => (
                  <h1
                    style={{
                      color: "#7DD3FC",
                      marginTop: "28px",
                      marginBottom: "18px"
                    }}
                  >
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2
                    style={{
                      color: "#7DD3FC",
                      marginTop: "24px",
                      marginBottom: "16px"
                    }}
                  >
                    {children}
                  </h2>
                ),

                table: ({ children }) => (
                  <table
                    style={{
                      width: "100%",

                      display: "block",

                      overflowX: "auto",

                      borderCollapse: "collapse",

                      marginTop: "24px",

                      marginBottom: "32px",

                      background: "#161B22",

                      borderRadius: "12px",

                      maxWidth: "100%"
                    }}
                  >
                    {children}
                  </table>
                ),

                th: ({ children }) => (
                  <th
                    style={{
                      border: "1px solid #30363D",
                      padding: "14px",
                      background: "#21262D",
                      color: "#7DD3FC",
                      textAlign: "left"
                    }}
                  >
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td
                    style={{
                      border: "1px solid #30363D",
                      padding: "14px",
                      verticalAlign: "top"
                    }}
                  >
                    {children}
                  </td>
                ),

          code: ({ children, className }) => {

  const inline =
    !className;

  if(inline)
  {
    return(

      <code
        style={{
          background:"#161B22",
          padding:"4px 8px",
          borderRadius:"8px",
          color:"#E6EDF3",
          whiteSpace:"pre-wrap",
          wordBreak:"break-word"
        }}
      >
        {children}
      </code>

    );
  }

  return(

    <pre
      style={{
        background:"#111827",
        padding:"18px",
        borderRadius:"14px",
        overflowX:"auto",
        whiteSpace:"pre-wrap",
        wordBreak:"break-word",
        maxWidth:"100%"
      }}
    >
      <code>{children}</code>
    </pre>

  );
}

              }}
            >
              {loading ? review + "▋" : review}
            </ReactMarkdown>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;