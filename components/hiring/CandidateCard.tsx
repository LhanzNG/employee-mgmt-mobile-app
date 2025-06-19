import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, CircleUser as UserCircle } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface Candidate {
  id: string;
  name: string;
  position: string;
  stage: 'application' | 'interview' | 'offer' | 'hired' | 'rejected';
  rating?: number;
  photo?: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  onPress?: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onPress }) => {
  // Get stage color
  const getStageColor = () => {
    switch (candidate.stage) {
      case 'application':
        return colors.primary[500];
      case 'interview':
        return colors.warning[500];
      case 'offer':
        return colors.success[500];
      case 'hired':
        return colors.info[500];
      case 'rejected':
        return colors.error[500];
      default:
        return colors.gray[500];
    }
  };
  
  // Format stage text
  const formatStage = (stage: string) => {
    return stage.charAt(0).toUpperCase() + stage.slice(1);
  };
  
  // Render rating stars
  const renderRating = () => {
    if (!candidate.rating) return null;
    
    const fullStars = Math.floor(candidate.rating);
    const hasHalfStar = candidate.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Star 
            key={`full-${i}`} 
            size={14} 
            color={colors.warning[500]} 
            fill={colors.warning[500]} 
            style={styles.starIcon}
          />
        ))}
        
        {hasHalfStar && (
          <Star 
            key="half" 
            size={14} 
            color={colors.warning[500]} 
            fill={colors.warning[500]} 
            style={styles.starIcon}
          />
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <Star 
            key={`empty-${i}`} 
            size={14} 
            color={colors.gray[300]} 
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.photoContainer}>
        {candidate.photo ? (
          <Image source={{ uri: candidate.photo }} style={styles.photo} />
        ) : (
          <UserCircle size={60} color={colors.gray[400]} />
        )}
      </View>
      
      <Text style={styles.name} numberOfLines={1}>{candidate.name}</Text>
      <Text style={styles.position} numberOfLines={1}>{candidate.position}</Text>
      
      {renderRating()}
      
      <View 
        style={[
          styles.stageBadge, 
          { backgroundColor: getStageColor() }
        ]}
      >
        <Text style={styles.stageText}>
          {formatStage(candidate.stage)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: 160,
    marginRight: 12,
  },
  photoContainer: {
    marginBottom: 12,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.gray[800],
    textAlign: 'center',
    marginBottom: 4,
  },
  position: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starIcon: {
    marginHorizontal: 1,
  },
  stageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: colors.white,
  },
});

export default CandidateCard;