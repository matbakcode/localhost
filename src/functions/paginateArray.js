/**
 * @param {Array} dataEntries - Data for pagination
 * @param {Object} settings - Settings object
 * @param {number} settings.actualPageIdx - Current page index
 * @param {number} settings.entriesOnPage - All entries on page
 */
export const paginateArray = (dataEntries = [], settings) => {

    function paginateArrayDataEntriesNormalize (dataEntries, defaultDataEntries) {
        return (
            dataEntries &&
            Array.isArray(dataEntries) &&
            dataEntries.constructor === Array
        ) ?
            dataEntries :
            defaultDataEntries;
    }

    function paginateArraySettingsValueNormalize (value, defaultValue) {
        console.log(
            typeof value === 'number',
            isFinite(value),
            value > 0
        )
        return (
            typeof value === 'number' &&
            isFinite(value) &&
            value > 0
        ) ?
            value :
            defaultValue;
    }

    function paginateArraySettingsNormalize (settings, defaultSettings) {
       return (settings &&
            typeof settings === 'object' &&
            settings.constructor === Object
        ) ?
            {
                actualPageIdx: paginateArraySettingsValueNormalize(settings.actualPageIdx, defaultSettings.actualPageIdx),
                entriesOnPage: paginateArraySettingsValueNormalize(settings.entriesOnPage, defaultSettings.entriesOnPage),
            } :
            {...defaultSettings};

    }

    const defaultSettings = {
        actualPageIdx: 1,
        entriesOnPage: 10
    }

    const dataArrayNormalized = paginateArrayDataEntriesNormalize(dataEntries, []);
    const settingsNormalized = paginateArraySettingsNormalize(settings, defaultSettings);

    const paginationIndexStart = (settingsNormalized.actualPageIdx-1) * settingsNormalized.entriesOnPage;
    const paginationIndexEnd = ((settingsNormalized.actualPageIdx-1) * settingsNormalized.entriesOnPage) + settingsNormalized.entriesOnPage

    const entriesOnSelectedPage = dataArrayNormalized.slice(paginationIndexStart, paginationIndexEnd);

    return entriesOnSelectedPage;
}