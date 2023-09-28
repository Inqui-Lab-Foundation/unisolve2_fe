module.exports = {
    moduleNameMapper: {
        '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
        '^localStorage$': '<rootDir>/__mocks__/localStorageMock.js'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    bail: 1,
    verbose: true,
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './coverage',
                filename: 'report.html',
                expand: true
            }
        ]
    ]
};
