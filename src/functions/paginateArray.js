export const paginateArray = (dataEntries, settings) => {

    function paginateArraySettingsValueNormalize (param, def) {
        return (
            typeof param !== 'number' ||
            param < 1
        ) ? def : param;
    }

    const defaultSettings = {
        actualPageIdx: 1,
        entriesOnPage: 10
    }

    const s = {
        actualPageIdx: paginateArraySettingsValueNormalize( settings.actualPageIdx, defaultSettings.actualPageIdx ),
        entriesOnPage: paginateArraySettingsValueNormalize( settings.entriesOnPage, defaultSettings.entriesOnPage ),
    }

    const range = {
        start: (s.actualPageIdx - 1) * s.entriesOnPage,
        end: ((s.actualPageIdx - 1) * s.entriesOnPage) + s.entriesOnPage
    }

    const entriesOnSelectedPage = dataEntries.slice(range.start, range.end);

    return entriesOnSelectedPage;
}