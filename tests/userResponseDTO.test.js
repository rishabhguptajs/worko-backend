import UserResponseDTO from "../dtos/response/userResponseDTO.js";

describe('UserResponseDTO tests', () => {
    it('should correctly initialize UserResponseDTO', () => {
        const data = {
            email: 'test@gamil.com',
            name: 'test user',
            age: 1,
            city: 'test city',
            zipCode: '1234',
        };

        const user = new UserResponseDTO(data);

        expect(user.email).toBe(data.email);
        expect(user.name).toBe(data.name);
        expect(user.age).toBe(data.age);
        expect(user.city).toBe(data.city);
        expect(user.zipCode).toBe(data.zipCode);
    })

    it('should handle missing data', () => {
        const data = {
            email: 'test@example.com',
            name: 'test user',
        }

        const user = new UserResponseDTO(data);

        expect(user.email).toBe(data.email);
        expect(user.name).toBe(data.name);
        expect(user.age).toBe(undefined);
        expect(user.city).toBe(undefined);
        expect(user.zipCode).toBe(undefined);
    })

    it('should handle extra data', () => {
        const data = {
            email: 'test@test.com',
            name: 'test user',
            age: 1,
            city: 'test city',
            zipCode: '1234',
            extra: 'some data'
        }

        const user = new UserResponseDTO(data);

        expect(user.email).toBe(data.email);
        expect(user.name).toBe(data.name);
        expect(user.age).toBe(data.age);
        expect(user.city).toBe(data.city);
        expect(user.zipCode).toBe(data.zipCode);
        expect(user.extra).toBe(undefined);
    })

    it('should handle empty data', () => {
        const data = {};

        const user = new UserResponseDTO(data);

        expect(user.email).toBe(undefined);
        expect(user.name).toBe(undefined);
        expect(user.age).toBe(undefined);
        expect(user.city).toBe(undefined);
        expect(user.zipCode).toBe(undefined);
    })
})