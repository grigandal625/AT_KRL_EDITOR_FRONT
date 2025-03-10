import { selectkbEvents } from "../../redux/stores/kbEventsSlicer";
import { useDispatch, useSelector } from "react-redux";
import { selectkbIntervals } from "../../redux/stores/kbIntervalsSlicer";
import { Button, Menu, Popover, Space, Typography } from "antd";
import { temporal } from "../../GLOBAL";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";

export const TemporalEntitySelect = ({ value, onChange }) => {
    const dispatch = useDispatch();
    const kbEventsStore = useSelector(selectkbEvents);
    const kbIntervalsStore = useSelector(selectkbIntervals);
    const { id } = useParams();

    useEffect(() => {
        if (!kbEventsStore.kbId || parseInt(kbEventsStore.kbId) !== parseInt(id)) {
            dispatch(kbEventsStore.getAction(id));
        }
        if (!kbIntervalsStore.kbId || parseInt(kbIntervalsStore.kbId) !== parseInt(id)) {
            dispatch(kbIntervalsStore.getAction(id));
        }
    }, [id]);

    const tagStores = {
        Event: kbEventsStore,
        Interval: kbIntervalsStore,
    };

    const seletedEvent = kbEventsStore.items.find((e) => e.kb_id === value?.id);
    const seletedInterval = kbIntervalsStore.items.find((e) => e.kb_id === value?.id);
    const seletedEntity = seletedEvent || seletedInterval;
    const selectedKeyPrefix = seletedEvent ? "Event" : "Interval";
    const selectedKey = seletedEntity ? `${selectedKeyPrefix}-${seletedEntity.id}` : undefined;

    const items = [];

    items.push({
        key: "1",
        label: <b>События</b>,
        children: kbEventsStore.items.map((e) => ({ key: `Event-${e.id}`, label: e.kb_id })),
    });
    
    items.push({
        key: "2",
        label: <b>Интервалы</b>,
        children: kbIntervalsStore.items.map((e) => ({ key: `Interval-${e.id}`, label: e.kb_id })),
    });
    
    const onSelectItem = ({ key }) => {
        const [tag, itemIdStr] = key.split("-");
        const itemId = parseInt(itemIdStr);
        const item = tagStores[tag].items.find((e) => parseInt(e.id) === itemId);
        onChange({
            tag: 'ref',
            id: item.kb_id,
            meta: "allen_reference",
        });
    };

    return (
        <Space wrap={false}>
            {seletedEntity ? (
                <Link target="_blank" to={tagStores[selectedKeyPrefix].urlRenderer({ id, item: seletedEntity })}>
                    {value.id}
                </Link>
            ) : (
                <Typography.Text style={{ whiteSpace: "nowrap" }} type="secondary">
                    (выберите)
                </Typography.Text>
            )}
            <Popover
                style={{ padding: 0 }}
                trigger="click"
                placement="bottomLeft"
                content={<Menu onClick={onSelectItem} selectedKeys={selectedKey ? [selectedKey] : []} items={items} mode={"inline"} />}
            >
                <Button size="small" type="link" icon={<DownOutlined />} />
            </Popover>
        </Space>
    );
};

export default ({ value, onChange, operation }) => {
    const dispatch = useDispatch();
    const kbEventsStore = useSelector(selectkbEvents);
    const kbIntervalsStore = useSelector(selectkbIntervals);
    const { id } = useParams();

    useEffect(() => {
        if (!kbEventsStore.kbId || parseInt(kbEventsStore.kbId) !== parseInt(id)) {
            dispatch(kbEventsStore.getAction(id));
        }
        if (!kbIntervalsStore.kbId || parseInt(kbIntervalsStore.kbId) !== parseInt(id)) {
            dispatch(kbIntervalsStore.getAction(id));
        }
    }, [id]);

    const tag = operation;

    const updateLeft = (newLeft) => {
        const v = { ...value, tag, left: newLeft };
        onChange(v);
    };
    const updateRight = (newRight) => {
        const v = { ...value, tag, right: newRight };
        onChange(v);
    };

    return (
        <Space>
            <TemporalEntitySelect value={value?.left} onChange={updateLeft} />
            <Typography.Text>
                <b>{operation || ""}</b>
            </Typography.Text>
            <TemporalEntitySelect value={value?.right} onChange={updateRight} />
        </Space>
    );
};
