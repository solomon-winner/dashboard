
export const GetWereda = () => {
    const { data: wereda, isSuccess, isFetching } = useGetWeredaQuery();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            dispatch(setWereda(wereda.data));
        }
    }, [isSuccess, wereda, dispatch]);
}