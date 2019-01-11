export default interface ColorBlockProps {
    children: React.ReactNode;
    color?: string;
};

export interface ColorBlockState {
    isClicked: boolean;
    isHover: boolean;
}