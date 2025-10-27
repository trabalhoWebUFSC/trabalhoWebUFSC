const validatePassword = (value) => {
    // array de objetos com as regras de validacao
    const rules = [ 
        { message: "Senha deve ter ao menos 8 caracteres", isValid: value.length >= 8 },
        { message: "Senha deve ter ao menos um caractere maiúsculo", isValid: /[A-Z]/.test(value) },
        { message: "Senha deve ter ao menos um caractere minúsculo", isValid: /[a-z]/.test(value) },
        { message: "Senha deve ter ao menos um dígito", isValid: /[0-9]/.test(value) },
        { message: "Senha deve ter ao menos um caractere especial", isValid: /[!@#$%^&*]/.test(value) }
    ];
    return rules;
}

const confirmPassword = (value, password) => {
    if (value !== password) return "Senhas não coincidem";
    return ''; // retorna string vazia no lugar de undefined
}

export { validatePassword, confirmPassword };
