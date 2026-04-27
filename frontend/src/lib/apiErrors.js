function normalizeMessage(message) {
  if (typeof message !== "string") {
    return null;
  }

  const trimmed = message.trim();
  return trimmed || null;
}

function translateMessage(message) {
  const normalized = normalizeMessage(message);

  if (!normalized) {
    return null;
  }

  const dictionary = {
    "This password is too common.": "Пароль слишком простой. Придумай более уникальный пароль.",
    "This password is entirely numeric.": "Пароль не должен состоять только из цифр.",
    "This password is too short.": "Пароль слишком короткий.",
    "A user with that username already exists.": "Пользователь с таким username уже существует.",
    "user with this username already exists.": "Пользователь с таким username уже существует.",
    "User with this username already exists.": "Пользователь с таким username уже существует.",
    "User with this email already exists.": "Пользователь с таким email уже существует.",
    "user with this email already exists.": "Пользователь с таким email уже существует.",
    "Enter a valid email address.": "Введи корректный email.",
    "No active account found with the given credentials": "Неверный email или пароль.",
    "No active account found with the given credentials.": "Неверный email или пароль.",
  };

  return dictionary[normalized] ?? normalized;
}

function flattenMessages(value) {
  if (Array.isArray(value)) {
    return value.map(flattenMessages).flat().filter(Boolean);
  }

  if (value && typeof value === "object") {
    return Object.values(value).map(flattenMessages).flat().filter(Boolean);
  }

  const message = translateMessage(value);
  return message ? [message] : [];
}

export function parseApiError(error, fallbackMessage = "Something went wrong") {
  const payload = error?.response?.data;

  if (!payload) {
    if (error?.code === "ERR_NETWORK") {
      return {
        message: "Не удалось подключиться к серверу. Проверь, запущен ли backend.",
        fieldErrors: {},
      };
    }

    return {
      message: translateMessage(error?.message) ?? fallbackMessage,
      fieldErrors: {},
    };
  }

  if (typeof payload === "string") {
    return {
      message: translateMessage(payload) ?? fallbackMessage,
      fieldErrors: {},
    };
  }

  if (Array.isArray(payload)) {
    const messages = flattenMessages(payload);
    return {
      message: messages[0] ?? fallbackMessage,
      fieldErrors: {},
    };
  }

  const fieldErrors = {};

  for (const [key, value] of Object.entries(payload)) {
    if (key === "detail" || key === "non_field_errors") {
      continue;
    }

    const messages = flattenMessages(value);
    if (messages.length > 0) {
      fieldErrors[key] = messages[0];
    }
  }

  const genericMessages = [
    ...flattenMessages(payload.detail),
    ...flattenMessages(payload.non_field_errors),
  ];

  return {
    message: genericMessages[0] ?? Object.values(fieldErrors)[0] ?? fallbackMessage,
    fieldErrors,
  };
}
