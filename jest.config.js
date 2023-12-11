module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',



      },
  };
