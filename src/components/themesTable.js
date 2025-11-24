import React, { useRef, memo, useMemo, useState, useEffect } from "react";
import YAMLFileResolver from "@site/src/components/shared-libs/yamlFileResolver";

const SCHEMA_GROUPS = {
  Places: ["places/place.yaml"],
  Addresses: ["addresses/address.yaml"],
  Buildings: ["buildings/building.yaml", "buildings/building_part.yaml"],
  Transportation: ["transportation/segment.yaml", "transportation/connector.yaml"],
  Divisions: [
    "divisions/division.yaml",
    "divisions/division_area.yaml",
    "divisions/division_boundary.yaml",
  ],
  Base: [
    "base/bathymetry.yaml",
    "base/land.yaml",
    "base/land_use.yaml",
    "base/land_cover.yaml",
    "base/infrastructure.yaml",
  ],
};

const useIsOverflowing = (text, lines) => {
  const ref = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight || 20);
    const maxHeight = lineHeight * lines;
    const checkOverflow = () => setIsOverflowing(el.scrollHeight > maxHeight + 1);

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, lines]);

  return [ref, isOverflowing];
};

const getCroppedCellStyle = (cropped, lines) => ({
  position: "relative",
  overflow: cropped ? "hidden" : "visible",
  maxHeight: cropped ? `${1.6 * lines}em` : "none",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: cropped ? lines : "unset",
  textOverflow: cropped ? "ellipsis" : "clip",
  whiteSpace: "pre-line",
  cursor: "pointer",
  transition: "max-height 0.3s ease, mask-image 0.2s ease",
  ...(cropped && {
    maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
  }),
});

const CroppedText = memo(({ text, expanded, lines = 10 }) => {
  const [ref, isOverflowing] = useIsOverflowing(text, lines);
  const cropped = !expanded && isOverflowing;

  return (
    <div ref={ref} style={getCroppedCellStyle(cropped, lines)}>
      {text || "—"}
    </div>
  );
});


const renderCodeSpans = (text) => {
  const parts = String(text).split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} style={{ margin: "0 0.15rem" }}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const getGeometryTypes = (schemas) => {
  const extract = (geom) => {
    if (!geom) return [];
    const items = geom.oneOf || geom.allOf || [geom];
    return items
      .map((g) => g.$ref?.match(/([A-Za-z]+)\.json$/)?.[1] || "Unknown")
      .filter(Boolean);
  };

  return [...new Set(schemas.flatMap(s => extract(s?.properties?.geometry)))];
};

export default function ThemesTable({ data }) {
  const themes = data.themes;
  const [expandedTheme, setExpandedTheme] = useState(null);
  const [schemas, setSchemas] = useState({});
  const parsedSchemas = useMemo(() => schemas, [schemas]);

  useEffect(() => {
    const resolver = YAMLFileResolver();
    const allPaths = Object.values(SCHEMA_GROUPS).flat();

    Promise.all(allPaths.map((p) => resolver.resolve(p))).then((loaded) => {
      const result = {};
      let index = 0;
      for (const [group, paths] of Object.entries(SCHEMA_GROUPS)) {
        result[group] = paths.map(() => loaded[index++]);
      }
      setSchemas(result);
    });
  }, []);


  const th = {
    borderBottom: "2px solid #ccc",
    textAlign: "left",
    padding: "6px 8px",
    backgroundColor: "#f7f7f7",
    fontWeight: 600,
    fontSize: "0.85rem",
  };

  const td = {
    borderBottom: "1px solid #eee",
    padding: "6px 8px",
    verticalAlign: "top",
    fontSize: "0.88rem",
  };

  const toggleExpand = (themeName) =>
    setExpandedTheme(expandedTheme === themeName ? null : themeName);

  const checkIcon = (val, hasNote = false) => {
    if (val) {
      return hasNote ? "☑️" : "✅"
    }
    return "❌"
  };

  const FlagCell = ({ item }) => {
    const note = item?.note || ""
    const hasNote = Boolean(note)

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          cursor: hasNote ? "help" : "default",
        }}
        title={hasNote ? note : undefined}
      >
        {checkIcon(item?.flag, hasNote)}
      </span>
    )
  };

  const renderList = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return <span>—</span>;

    return (
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {arr.map((item, i) => {
          if (typeof item === "object" && item !== null) {
            return <li key={i}>{renderNameWithUrl(item.name, item.url)}</li>;
          }
          return <li key={i}>{item}</li>;
        })}
      </ul>
    );
  };

  const renderNameWithUrl = (name, url, strong = false) => {
    const label = name || url || "—";

    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0366d6", textDecoration: "none" }}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          {label}
        </a>
      );
    }

    return strong ? <strong>{label}</strong> : <span>{label}</span>;
  };

  const renderSources = (sources) => {
    if (!Array.isArray(sources) || sources.length === 0) return <span>—</span>;

    return (
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {sources.map((src, i) => (
          <li key={i} style={{ marginBottom: "0.3rem" }}>
            {renderNameWithUrl(src.name, src.url, true)}
            <div style={{ color: "#666", fontSize: "0.8rem" }}>
              {src.type ? `${src.type}` : "—"}
              {src.freshness ? ` • ${src.freshness}` : ""}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.88rem",
        }}
      >
        <caption style={{ fontSize: "0.8rem", color: "#777", captionSide: "top" }}>
          💡 Click a row to view detailed theme definition.
        </caption>
        <thead>
          <tr>
            <th style={th}>Theme</th>
            <th style={{ ...th, minWidth: "10rem" }}>Description</th>
            <th style={th}>Coverage</th>
            <th style={th}>Quality</th>
            <th style={th}>Release Frequency</th>
            <th style={th}>Licenses</th>
            <th style={th}>Sources</th>
            <th style={th}>GERS</th>
            <th style={th}>Registry</th>
            <th style={th}>Changelog</th>
            <th style={th}>Bridge Files</th>
            <th style={th}>Confidence Score</th>
            <th style={th}>Geometry Types</th>
            <th style={{ ...th, minWidth: "10rem" }} title="Describes the rules applied to source datasets for including/excluding features.">Filtering</th>
            <th style={{ ...th, minWidth: "10rem" }} title="Describes the logic of identifying and relating the same real-world objects across different datasets.">Matching</th>
            <th style={{ ...th, minWidth: "10rem" }} title="Describes the logic of merging features from different datasets into one unified representation.">Merging</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(themes).map(([name, theme]) => {
            const schemas = parsedSchemas[name] || [];
            const geometries = getGeometryTypes(schemas);
            const shortDef = theme.brief_description || "—";
            const coverage = theme.quality_assurance?.coverage_summary || "—";
            const quality = theme.quality_assurance?.quality_summary || "—";
            const filteringSummary = theme.filtering?.summary || "—";
            const matchingSummary = theme.matching?.summary || "—";
            const mergingSummary = theme.merging?.summary || "—";
            const gers = theme.gers || {};
            const freshnessText = theme.freshness?.release_frequency || "";

            return (
              <React.Fragment key={name}>
                <tr
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      expandedTheme === name ? "#f7f7f7" : "white",
                    transition: "background-color 0.2s ease",
                  }}
                  onClick={() => toggleExpand(name)}
                >
                  <td style={td}>
                    <strong>{name}</strong>
                  </td>
                  <td style={{ ...td, whiteSpace: "pre-line" }}>{shortDef}</td>
                  <td style={td}>{coverage}</td>
                  <td style={td}>{quality}</td>
                  <td style={td}>{freshnessText}</td>
                  <td style={td}>{renderList(theme.licenses || [])}</td>
                  <td style={td}>
                    <CroppedText text={renderSources(theme.sources)} expanded={expandedTheme === name} />
                  </td>
                  <td style={td}><FlagCell item={gers.gersified} /></td>
                  <td style={td}><FlagCell item={gers.registry} /></td>
                  <td style={td}><FlagCell item={gers.data_changelog} /></td>
                  <td style={td}><FlagCell item={gers.bridge_files} /></td>
                  <td style={td}><FlagCell item={theme.signal_confidence_score} /></td>
                  <td style={td}>{geometries.join(", ") || "—"}</td>
                  <td style={td}>
                    <CroppedText text={renderCodeSpans(filteringSummary)} expanded={expandedTheme === name} />
                  </td>
                  <td style={td}>
                    <CroppedText text={renderCodeSpans(matchingSummary)} expanded={expandedTheme === name} />
                  </td>
                  <td style={td}>
                    <CroppedText text={renderList(mergingSummary)} expanded={expandedTheme === name} />
                  </td>
                </tr>

                {expandedTheme === name && (
                  <tr>
                    <td
                      colSpan={16}
                      style={{
                        ...td,
                        backgroundColor: "#f0fbfcc6",
                        paddingTop: "1.5rem",
                        paddingBottom: "2rem",
                        borderTop: "2px solid #d9f0f2",
                      }}
                    >
                      <ExpandedThemeDetails theme={theme} schemas={schemas} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ExpandedThemeDetails({ theme, schemas }) {
  const blockStyle = { marginBottom: "1.2rem" };

  const boxGrid = {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    marginTop: "1.2rem",
    marginBottom: "2rem",
  };

  const box = {
    border: "1px solid #d9f0f2",
    backgroundColor: "#f7fcfc",
    padding: "0.9rem 1.1rem",
    fontSize: "0.9rem",
  };

  const boxTitle = {
    fontWeight: "600",
    fontSize: "0.95rem",
    marginBottom: "0.4rem",
    textTransform: "capitalize",
  };

  const renderList = (arr) => (
    <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
      {arr.map((item, i) => (
        <li key={i}>{renderCodeSpans(item)}</li>
      ))}
    </ul>
  );

  const renderKeyValue = (obj) => {
    if (!obj || typeof obj !== "object") return <span>—</span>;

    const entries = Object.entries(obj).filter(
      ([key]) => !key.toLowerCase().includes("summary")
    );
    if (entries.length === 0) return <span>—</span>;

    const capitalize = (s) =>
      s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");

    return (
      <ul style={{ margin: 0, paddingLeft: "1.25rem", listStyleType: "disc" }}>
        {entries.map(([key, value]) => {
          if (value == null) return null;

          let displayValue;

          if (Array.isArray(value)) {
            const items = value.filter(Boolean);
            displayValue =
              items.length > 0 ? (
                <ul style={{ margin: "0.3rem 0", paddingLeft: "1.25rem", listStyleType: "circle" }}>
                  {items.map((v, i) => (
                    <li key={i}>
                      {typeof v === "object"
                        ? renderKeyValue(v)
                        : renderCodeSpans(v)}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>—</span>
              );
          }
          else if (typeof value === "object") {
            displayValue = renderKeyValue(value);
          }
          else {
            displayValue =
              value !== "" ? renderCodeSpans(String(value)) : <span>—</span>;
          }

          return (
            <li key={key} style={{ marginBottom: "0.4rem" }}>
              <strong>{capitalize(key)}:</strong> {displayValue}
            </li>
          );
        })}
      </ul>
    );
  };


  const renderSchemaSummaries = (schemas) => {
    if (!schemas || schemas.length === 0) return null;
    return (
      <div style={{ marginBottom: "1.8rem" }}>
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Data Types</div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {schemas.map((schema, idx) => {
            const props = schema.properties?.properties?.properties || {};
            const geometries = getGeometryTypes([schema]);

            return (
              <div
                key={idx}
                style={{
                  border: "1px solid #d9f0f2",
                  backgroundColor: "#f7fcfc",
                  padding: "0.8rem 1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "0.2rem" }}>
                  {schema.title}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    whiteSpace: "pre-line",
                    marginBottom: "0.4rem",
                  }}
                >
                  {schema.description}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#444" }}>
                  <strong>Geometry:</strong> {geometries.join(", ") || "—"}
                </div>
                {Object.keys(props).length > 0 && (
                  <details style={{ marginTop: "0.4rem" }}>
                    <summary style={{ cursor: "pointer", fontSize: "0.85rem" }}>
                      Show properties
                    </summary>
                    <ul style={{ marginTop: "0.3rem", paddingLeft: "1.25rem" }}>
                      {Object.entries(props).map(([k, v]) => (
                        <li key={k} style={{ marginBottom: "0.3rem" }}>
                          <code>{k}</code> — {v.description || "—"}

                          {Array.isArray(v.enum) && v.enum.length > 0 && (
                            <details style={{ marginTop: "0.15rem", fontSize: "0.8rem", color: "#555" }}>
                              <summary style={{ cursor: "pointer" }}>
                                Show {v.enum.length} values
                              </summary>
                              <div style={{
                                maxHeight: "6rem",
                                overflowY: "auto",
                                paddingRight: "0.25rem",
                              }}>
                                {v.enum.join(", ")}
                              </div>
                            </details>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderSchemaSummaries(schemas)}

      {theme.excluded_by_design && (
        <div style={blockStyle}>
          <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Excluded by Design
          </div>
          {renderList(theme.excluded_by_design)}
        </div>
      )}

      {theme.quality_assurance && (
        <div style={blockStyle}>
          <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Quality Assurance
          </div>
          {renderKeyValue(theme.quality_assurance)}
        </div>
      )}

      <div style={boxGrid}>
        {theme.filtering && (
          <div style={box}>
            <div style={boxTitle}>Filtering</div>
            {renderKeyValue(theme.filtering)}
          </div>
        )}
        {theme.matching && (
          <div style={box}>
            <div style={boxTitle}>Matching</div>
            {renderKeyValue(theme.matching)}
          </div>
        )}
        {theme.merging && (
          <div style={box}>
            <div style={boxTitle}>Merging</div>
            {renderKeyValue(theme.merging)}
          </div>
        )}
      </div>
    </div>
  );
}
