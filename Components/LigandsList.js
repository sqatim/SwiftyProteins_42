import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import ligands from "../Utils/ligands.json";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput } from "react-native";

const RenderItem = ({ item, navigation }) => {
  return (
    <LigandItem
      onPress={() => {
        navigation.navigate("RenderProtein", { ligand: item });
      }}
    >
      <LigandItemText>{item}</LigandItemText>
    </LigandItem>
  );
};

export default function LigandsList({ navigation }) {
  const [ligandsData, setLigandsData] = useState(ligands);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // console.log("navigation:", navigation);
    console.log(search);
    if (search == "") setLigandsData(ligands);
    else {
      const tmpArray = ligands.filter((element) => element.includes(search));
      setLigandsData(tmpArray);
    }
  }, [search]);
  return (
    <LigandsListStyle
      ListHeaderComponent={
        // <>
        <SearchComponent>
          <SearchContainerStyle>
            <ImageStyle source={require("../assets/search.png")}></ImageStyle>
            <SearchInputStyle
              value={search}
              onChangeText={setSearch}
              placeholder="search"
            />
          </SearchContainerStyle>
        </SearchComponent>
        // </>
      }
      data={ligandsData}
      renderItem={({ item }) => (
        <RenderItem item={item} navigation={navigation} />
      )}
      stickyHeaderIndices={[0]}
    />
  );
}

const LigandsListStyle = styled.FlatList`
  flex: 1;
  /* background-color: gray; */
`;

const LigandItem = styled.TouchableOpacity`
  /* background-color: red; */
  height: 45px;
  margin: 5px auto;
  width: 70%;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 15px;
  border-color: #0b65c2;
`;

const LigandItemText = styled.Text`
  width: 100%;
  margin-left: 10px;
  color: #0b65c2;
  text-align: center;
  /* background-color: #fff; */
  /* color: white; */
`;

const SearchComponent = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  /* position: sticky; */
`;

const SearchContainerStyle = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  /* background-color: yellow; */
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

const SearchInputStyle = styled.TextInput`
  /* border-width: 1px; */
  /* flex: 1; */
  width: 70%;
  padding-left: 10px;
`;

const ImageStyle = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
