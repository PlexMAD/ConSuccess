import bcrypt from 'bcrypt';

const saltRounds = 10;

export function encrypt(pass: string) {
    return bcrypt.hash(pass, saltRounds);
}

export function compareWithHash(pass: string, hash: string) {
    return bcrypt.compare(pass, hash)
}