import { LanguageServerAsync } from "@ts-utils/shared";
import { createArgLangServiceTester } from "../createArgLangServiceTester";

describe('getCompilerOptionsDiagnostics method', () => {
    let lang: LanguageServerAsync;
    beforeEach(function () {
        lang = createArgLangServiceTester(LanguageServerAsync.Metadata);
    });

    xit('should support being called', function () {
        // lang.getCompilerOptionsDiagnostics
    });
});