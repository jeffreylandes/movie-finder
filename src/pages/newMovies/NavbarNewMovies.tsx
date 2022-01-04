import { atom, useRecoilState } from "recoil";

const buttonStyle = {
    backgroundColor: "gray",
    borderColor: "gray",
    borderStyle: "none",
    fontFamily: "Trebuchet MS",
    fontSize: "15px",
  };


export const displayTypeAtom = atom<string>({
    key: "DisplayType",
    default: "By Movie Popularity"
})


function Button(name: string) {
    const [displayType, setDisplayType] = useRecoilState(displayTypeAtom);
    const displayTypeIsName = displayType === name;
    const onClick = () => {
        if (!displayTypeIsName) {
            setDisplayType(name);
        }
    }
    const finalStyle = displayTypeIsName ? {...buttonStyle, fontWeight: "bold"} : buttonStyle
    return <button style={finalStyle} onClick={onClick}>{name}</button>
}


export function Navbar() {
  return (
    <div style={{width: "15%", backgroundColor: "gray"}}>
      <ul>
          {Button("By Movie Popularity")}
          {Button("By Actor / Actress")}
      </ul>
    </div>
  );
}
