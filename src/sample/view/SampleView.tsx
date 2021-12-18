import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSamples, SamplesState} from "@src/sample/slice/samplesSlice";
import {RootState} from "@src/store/store";

export function SampleView() {
    const {samples, page} = useSelector<RootState, SamplesState>(state => state.samples);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSamples({page: page + 1}));
    }, []);

    return (
        <ul>
            {samples.map((sample, idx) => (
                <li key={idx}>{sample.name}</li>
            ))}
        </ul>
    );
}