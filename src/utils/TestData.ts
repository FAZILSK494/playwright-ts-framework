export interface UserFormData {
    name: string;
    password: string;
    email: string;
    phone: string;
    bio: string;
}

export const TestData = {
    auth: {
        validUser: {
            username: process.env.DEFAULT_ADMIN_USER || 'admin',
            password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123',
        },
        invalidUser: {
            username: 'invalid_user',
            password: 'wrong_password',
        },
        emptyUser: {
            username: '',
            password: '',
        },
    },

    basicForm: {
        // Positive Data Sets
        validSubmission: {
            name: 'Alex Mercer',
            password: 'SuperSecretPassword!123',
            email: 'alex.mercer@testqa.com',
            phone: '+1-555-019-2834',
            bio: 'Lead SDET with expertise in Playwright, TypeScript, and end-to-end automation frameworks.',
        } as UserFormData,

        specialCharactersAndUnicode: {
            name: 'José Müller & O\'Connor <Admin>',
            password: 'P@$$w0rd!#%^&*()_+{}[]:;"\'<>,.?/~`',
            email: 'jose.muller+automation_test@sub.example-domain.co.uk',
            phone: '+44 20 7946 0912',
            bio: 'Multiline bio with emojis 🚀 ✨ and Unicode characters: こんにちは, Café, naïve.',
        } as UserFormData,

        minimalData: {
            name: 'Sam',
            password: 'p',
            email: 'sam@ex.com',
            phone: '123',
            bio: '',
        } as UserFormData,

        boundaryLargeData: {
            name: 'A'.repeat(100),
            password: 'P'.repeat(128),
            email: `long.user.${'a'.repeat(40)}@example.com`,
            phone: '123456789012345',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
        } as UserFormData,

        // Negative Data Sets
        invalidEmailFormats: [
            'plainaddress_without_at_symbol',
            '@missingusername.com',
            'missing.domain@.com',
            'username@domain..com',
            'username@domain with space.com',
        ],

        whitespaceOnly: {
            name: '     ',
            password: '     ',
            email: '   ',
            phone: '   ',
            bio: '     ',
        } as UserFormData,

        emptyData: {
            name: '',
            password: '',
            email: '',
            phone: '',
            bio: '',
        } as UserFormData,
    },

    checkboxesRadios: {
        initialRadioResult: 'Selected: none',
        radioChoiceOneResult: 'Selected: one',
        radioChoiceTwoResult: 'Selected: two',
        revealedHiddenMessage: 'Hidden text is now visible!',
    },

    alerts: {
        initialResult: 'No interaction yet',
        alertExpectedMessage: 'This is a practice alert',
        alertResultText: 'Alert was shown and dismissed',
        confirmExpectedMessage: 'Do you confirm this action?',
        confirmAcceptedResultText: 'Confirm result: OK',
        confirmDismissedResultText: 'Confirm result: Cancel',
        promptExpectedMessage: 'Enter a value:',
        promptValidInput: 'Senior SDET Automation Engineer',
        promptCancelledResultText: 'Prompt value: (cancelled)',
        promptSpecialInput: 'Test!@#$%^&*()_+{}:"<>? 🚀 🔥',
    },

    modals: {
        expectedTitle: 'Practice Modal',
        expectedDescription: 'This is a modal dialog. Click the overlay, the X, or Close.',
    },

    dropdowns: {
        standardColor: 'green',
        multiTools: ['python', 'javascript'],
        dynamicTool: 'Playwright',
    },

    table: {
        searchKeyword: 'Anita',
        expectedDepartment: 'QA',
        expectedRole: 'SDET',
    },

    urls: {
        practiceHub: 'https://www.sreenidhirajakrishnan.com/practice',
        interviewQuestions: 'https://www.sreenidhirajakrishnan.com/interview-questions',
    },
};
