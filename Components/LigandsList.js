import React, { PureComponent, useEffect, useState } from "react";
import styled from "styled-components/native";
import ligands from "../Utils/ligands.json";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput } from "react-native";
import Header from "./Header";
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import { useMyContext } from "./Context";
import { parsePdbFunction } from "../Utils/data";

class RenderItem extends PureComponent {
  render() {
    const { item, navigation, setLoader, setParse } = this.props;
    return (
      <LigandItem
        onPress={() => {
          setLoader(true);
          parsePdbFunction(item).then((value) => {
            setParse(value);
            navigation.navigate("RenderProtein", { ligand: item });
            setLoader(false);
          });
        }}
      >
        <LigandItemText>{item}</LigandItemText>
      </LigandItem>
    );
  }
}

export default function LigandsList({ navigation, route }) {
  const [ligandsData, setLigandsData] = useState(ligands);
  const [search, setSearch] = useState("");
  const { setParse } = useMyContext();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // console.log("navigation:", navigation);
    // console.log(route);
    if (search == "") setLigandsData(ligands);
    else {
      const tmpArray = ligands.filter((element) =>
        element.includes(search.toUpperCase())
      );
      setLigandsData(tmpArray);
    }
  }, [search]);
  return (
    <LigandsListStyle
      ListHeaderComponent={
        <>
          <Header route={route.name} navigate={navigation.navigate} />
          <SearchComponent>
            <SearchContainerStyle>
              <ImageStyle
                source={require("../assets/search1.png")}
              ></ImageStyle>
              <SearchInputStyle
                value={search}
                onChangeText={setSearch}
                placeholder="search"
                placeholderTextColor="#c2daf2"
              />
            </SearchContainerStyle>
          </SearchComponent>
          <OrientationLoadingOverlay
            visible={loader}
            color="white"
            indicatorSize="large"
            messageFontSize={24}
            message="Loading..."
          />
        </>
      }
      data={ligandsData}
      renderItem={({ item }) => (
        <RenderItem
          item={item}
          navigation={navigation}
          setParse={setParse}
          setLoader={setLoader}
        />
      )}
      stickyHeaderIndices={[0]}
    />
  );
}

const LigandsListStyle = styled.FlatList`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
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
  border-color: ${({ theme }) => theme.borderColorItems};
  background-color: ${({ theme }) => theme.background};
`;

const LigandItemText = styled.Text`
  width: 100%;
  margin-left: 10px;
  color: ${({ theme }) => theme.color};
  text-align: center;
  /* color: white; */
`;

const SearchComponent = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  /* background-color: yellow; */
  /* position: sticky; */
`;

const SearchContainerStyle = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.background};
  height: 40px;
  /* border-bottom-width: 1px; */
  /* border-bottom-color: #f3f3f3; */
  width: 85%;
  border-radius: 15px;
  border: 1px;
  border-color: ${({ theme }) => theme.borderColorItems};
  /* background-color: red; */
`;

const SearchInputStyle = styled.TextInput`
  /* border-width: 1px; */
  /* flex: 1; */
  /* background-color: #fff; */
  background-color: ${({ theme }) => theme.background};

  /* background-color: red; */
  height: 100%;
  width: 80%;
  padding-left: 10px;
  color: ${({ theme }) => theme.color};
`;

const ImageStyle = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
