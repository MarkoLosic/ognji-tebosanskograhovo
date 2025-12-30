const EXCLUDED_KEYS = new Set(["image", "heroImage", "membersImages", "imageUrl"]);

export function flattenContent(content, parentPath = []) {
  const fields = [];

  Object.entries(content).forEach(([key, value]) => {
    if (EXCLUDED_KEYS.has(key)) {
      return;
    }

    const currentPath = [...parentPath, key];

    if (typeof value === "string") {
      fields.push({ path: currentPath, value, type: "string" });
      return;
    }

    if (Array.isArray(value)) {
      if (value.every((item) => typeof item === "string")) {
        fields.push({ path: currentPath, value, type: "stringArray" });
        return;
      }

      value.forEach((item, index) => {
        if (typeof item === "string") {
          fields.push({ path: [...currentPath, index], value: item, type: "string" });
          return;
        }
        if (item && typeof item === "object") {
          fields.push(...flattenContent(item, [...currentPath, index]));
        }
      });

      return;
    }

    if (value && typeof value === "object") {
      fields.push(...flattenContent(value, currentPath));
    }
  });

  return fields;
}

export function setContentValue(content, path, nextValue) {
  if (path.length === 0) return content;

  const [key, ...rest] = path;
  const cloned = Array.isArray(content) ? [...content] : { ...content };

  if (rest.length === 0) {
    cloned[key] = nextValue;
    return cloned;
  }

  cloned[key] = setContentValue(cloned[key], rest, nextValue);
  return cloned;
}
