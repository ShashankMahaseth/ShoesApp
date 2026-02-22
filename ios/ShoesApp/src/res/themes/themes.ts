export interface ThemesColor{
    background:string,
    text:string,
    primary:string,
    card:string,
    borderColor:string
}

export const lightTheme:ThemesColor = {
 background: "#FFFFFF",
  text: "#111111",
  primary: "#4F46E5",
  card: "#F3F4F6",
  borderColor:'#A8A8A9'
}
export const darkTheme:ThemesColor={
     card: "#161F28",
  text: "#FFFFFF",
  primary: "#6366F1",
  background: "#1A2530",
  borderColor:'#A8A8A9'
}