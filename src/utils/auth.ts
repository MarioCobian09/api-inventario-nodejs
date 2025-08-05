import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {

    // Hash Password
    const salt = await bcrypt.genSalt(10) // Genera un Salt que es un valor aleatorio el cual permite que aun que dos password sean iguales seran hasheadas de diferentes maneras,el 10 determina cuantas rondas ejecutara
    return await bcrypt.hash(password, salt)
}

export const checkPassword = async (enteredPassword: string, storedHash: string) => {
    return await bcrypt.compare(enteredPassword, storedHash)
}