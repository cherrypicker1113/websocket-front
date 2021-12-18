import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSamples, SamplesState} from "@src/sample/slice/samplesSlice";
import {RootState} from "@src/store";
import styled from "styled-components";

export function SampleView() {
    const {samples, page} = useSelector<RootState, SamplesState>(state => state.samples);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSamples({page: page + 1}));
    }, []);

    return (
        <List>
            {samples.map((sample, idx) => (
                <ListItem key={idx}>{sample.name}</ListItem>
            ))}
        </List>
    );
}

const List = styled.ul`
    background-color: black;
`;

const ListItem = styled.li`
    border: 1px solid white;
    color: white;
`;