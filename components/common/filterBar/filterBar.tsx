import styled from "@emotion/styled";
import Input from "../input";
import Select from "../select";
import SelectedElement from "./selectedElement";

const FilterBar = () => {
  return (
    <Wrapper>
      <SelectDiv>
        <Select onChange={(e) => console.log(e)}>
          <Select.Trigger>선택</Select.Trigger>
          <Select.OptionList>
            <Select.Option value="upload">최신 순</Select.Option>
            <Select.Option value="like">좋아요 순</Select.Option>
          </Select.OptionList>
        </Select>
        <Select onChange={(e) => console.log(e)}>
          <Select.Trigger>선택</Select.Trigger>
          <Select.OptionList>
            <Select.Option value="upload">최신 순</Select.Option>
            <Select.Option value="like">좋아요 순</Select.Option>
          </Select.OptionList>
        </Select>
        <Input searchIcon />
      </SelectDiv>
      <TagDiv>
        <SelectedElement content="hello" />
        <SelectedElement content="hellohellohello" />
      </TagDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 1053px;
  height: 73px;
  background-color: #f4f9fc;
  padding: 15px;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default FilterBar;
