export type ExtractFCType<T> = T extends React.FC<infer U> ? U : never;
