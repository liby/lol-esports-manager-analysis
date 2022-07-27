import { Button, Input, InputRef, Space, Table, TableColumnsType } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ColumnType, FilterConfirmProps } from "antd/lib/table/interface";
import { useRef, useState } from "react";
import personCollection from "../../data/source.json";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

type Person = typeof personCollection[number];

type DataIndex = keyof Person;

const PersonTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Person> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            确定
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            筛选
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]!.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Person> = [
    {
      title: "战队名称",
      dataIndex: "team",
      key: "team",
      fixed: "left",
      width: 90,
      ...getColumnSearchProps("team"),
    },
    {
      title: "选手 ID",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 100,
      ...getColumnSearchProps("name"),
    },
    {
      title: "赛季",
      dataIndex: "season",
      key: "season",
      width: 90,
      filters: [
        { text: "2022夏", value: "2022夏" },
        { text: "2022春", value: "2022春" },
        { text: "2021夏", value: "2021夏" },
        { text: "2021春", value: "2021春" },
        { text: "2020夏", value: "2020夏" },
        { text: "2020春", value: "2020春" },
        { text: "2019夏", value: "2019夏" },
        { text: "2019春", value: "2019春" },
        { text: "2018夏", value: "2018夏" },
        { text: "2018春", value: "2018春" },
        { text: "2017夏", value: "2017夏" },
        { text: "2017春", value: "2017春" },
      ],
    },
    {
      title: "能力值",
      dataIndex: "ability",
      key: "ability",
      width: 80,
    },
    {
      title: "位置",
      dataIndex: "role",
      key: "role",
      width: 90,
      filters: [
        { text: "上单", value: "上单" },
        { text: "打野", value: "打野" },
        { text: "中单", value: "中单" },
        { text: "ADC", value: "ADC" },
        { text: "辅助", value: "辅助" },
      ],
    },
    {
      title: "技能",
      dataIndex: "skill",
      key: "skill",
      width: 100,
      ...getColumnSearchProps("skill"),
    },
    {
      title: "招牌英雄",
      children: [
        {
          title: "招牌英雄 1",
          dataIndex: "signature1",
          key: "signature1",
        },
        {
          title: "招牌英雄 2",
          dataIndex: "signature2",
          key: "signature2",
        },
        {
          title: "招牌英雄 3",
          dataIndex: "signature3",
          key: "signature3",
        },
      ],
    },
    {
      title: "熟练英雄",
      children: [
        {
          title: "熟练英雄 1",
          dataIndex: "proficient1",
          key: "proficient1",
        },
        {
          title: "熟练英雄 2",
          dataIndex: "proficient2",
          key: "proficient2",
        },
        {
          title: "熟练英雄 3",
          dataIndex: "proficient3",
          key: "proficient3",
        },
        {
          title: "熟练英雄 4",
          dataIndex: "proficient4",
          key: "proficient4",
        },
      ],
    },
    {
      title: "标签",
      fixed: "right",
      children: [
        {
          title: "标签 1",
          dataIndex: "tag1",
          fixed: "right",
          key: "tag1",
          width: 70,
          ...getColumnSearchProps("tag1"),
        },
        {
          title: "标签 2",
          dataIndex: "tag2",
          fixed: "right",
          key: "tag2",
          width: 70,
          ...getColumnSearchProps("tag2"),
        },
        {
          title: "标签 3",
          dataIndex: "tag3",
          fixed: "right",
          key: "tag3",
          width: 70,
          ...getColumnSearchProps("tag3"),
        },
        {
          title: "标签 4",
          dataIndex: "tag4",
          fixed: "right",
          key: "tag4",
          width: 70,
          ...getColumnSearchProps("tag4"),
        },
      ],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={personCollection}
      bordered
      scroll={{ x: "calc(700px + 50%)", y: 400 }}
      rowKey={(record) => `${record.team}-${record.name}-${record.season}`}
    />
  );
};

export default PersonTable;
