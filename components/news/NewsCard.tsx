import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, MessageCircle, Share, Bookmark, Calendar, User } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface NewsCardProps {
  article: NewsArticle;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onBookmark: () => void;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  onLike, 
  onComment, 
  onShare, 
  onBookmark, 
  onPress 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'company':
        return colors.primary[500];
      case 'hr':
        return colors.success[500];
      case 'achievement':
        return colors.warning[500];
      case 'office':
        return colors.info[500];
      case 'events':
        return colors.secondary[500];
      default:
        return colors.gray[500];
    }
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: article.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(article.category) + '20' }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor(article.category) }]}>
              {article.category.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity onPress={onBookmark}>
            <Bookmark 
              size={20} 
              color={article.isBookmarked ? colors.primary[500] : colors.gray[400]}
              fill={article.isBookmarked ? colors.primary[500] : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary}>{article.summary}</Text>
        
        <View style={styles.meta}>
          <View style={styles.authorContainer}>
            <User size={14} color={colors.gray[500]} />
            <Text style={styles.author}>{article.author}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Calendar size={14} color={colors.gray[500]} />
            <Text style={styles.date}>{formatDate(article.publishedDate)}</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <Heart 
              size={18} 
              color={article.isLiked ? colors.error[500] : colors.gray[500]}
              fill={article.isLiked ? colors.error[500] : 'transparent'}
            />
            <Text style={[styles.actionText, article.isLiked && { color: colors.error[500] }]}>
              {article.likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onComment}>
            <MessageCircle size={18} color={colors.gray[500]} />
            <Text style={styles.actionText}>{article.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <Share size={18} color={colors.gray[500]} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
    marginBottom: 8,
    lineHeight: 24,
  },
  summary: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: 6,
  },
});

export default NewsCard;