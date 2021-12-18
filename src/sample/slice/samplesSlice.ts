import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SampleAgent} from '@src/sample/agent/SampleAgent';
import {Sample} from '@src/sample/model/Sample';

export type SamplesState = {
    samples: Sample[];
    page: number;
    hasNextPage: boolean;
};

type A = {samples: Sample[], page: number};
export const fetchSamples = createAsyncThunk<A, {page: number, query?: string}>(
    'samples/fetch',
    async ({page, query}) => {
        const {data: {list: samples}} = await SampleAgent.fetchSamples(page, 20, query);
        return {samples, page};
    },
);

const samplesSlice = createSlice<SamplesState, {}>({
    name: 'samples',
    initialState: {samples: [], page: 0, hasNextPage: true},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSamples.pending, (state, action) => {
            //
        }).addCase(fetchSamples.fulfilled, (state, action) => {
            const {samples, page} = action.payload;
            state.page = page;
            state.samples = page > 1 ? state.samples.concat(samples) : samples;
            state.hasNextPage = samples?.length > 0;
        }).addCase(fetchSamples.rejected, (state, action) => {
            state.hasNextPage = false;
        });
    },
});

export default samplesSlice.reducer;
