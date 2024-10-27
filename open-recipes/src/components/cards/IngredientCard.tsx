import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { styled } from 'nativewind';

interface VerticalImageCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const VerticalImageCard: React.FC<VerticalImageCardProps> = ({ title, description, imageUrl }) => {
  return (
    <StyledView className="w-[90%] bg-white rounded-lg shadow-lg my-4 self-center">
      <StyledImage source={{ uri: imageUrl }} className="w-full h-48 rounded-t-lg" />
      <StyledView className="p-4">
        <StyledText className="text-lg font-bold text-gray-800 mb-2">{title}</StyledText>
        <StyledText className="text-sm text-gray-600">{description}</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default VerticalImageCard;
