export const getImage = (path: string) => {
  const st = new URL(`${path}`, import.meta.url)
  return st.pathname
}
