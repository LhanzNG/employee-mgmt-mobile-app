import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Newspaper, Calendar, User, MessageCircle, Heart, Share, Bookmark } from 'lucide-react-native';

import { colors } from '@/styles/colors';
import HeaderBar from '@/components/ui/HeaderBar';
import NewsCard from '@/components/news/NewsCard';

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock news data
  const news = [
    {
      id: '1',
      title: 'Company Achieves Record Q1 Results',
      summary: 'We are excited to announce that our company has achieved record-breaking results in Q1 2023, with a 35% increase in revenue.',
      content: 'Full article content here...',
      category: 'company',
      author: 'CEO Office',
      publishedDate: '2023-05-10',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 42,
      comments: 8,
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '2',
      title: 'New Employee Wellness Program Launch',
      summary: 'Introducing our comprehensive wellness program designed to support employee health and work-life balance.',
      content: 'Full article content here...',
      category: 'hr',
      author: 'HR Team',
      publishedDate: '2023-05-08',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 28,
      comments: 12,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      title: 'Tech Team Wins Innovation Award',
      summary: 'Our development team has been recognized with the Industry Innovation Award for their groundbreaking work on AI integration.',
      content: 'Full article content here...',
      category: 'achievement',
      author: 'Communications',
      publishedDate: '2023-05-05',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 67,
      comments: 15,
      isLiked: true,
      isBookmarked: true
    },
    {
      id: '4',
      title: 'Office Renovation Project Update',
      summary: 'Phase 1 of our office renovation is complete! Check out the new collaborative spaces and modern amenities.',
      content: 'Full article content here...',
      category: 'office',
      author: 'Facilities Team',
      publishedDate: '2023-05-03',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 35,
      comments: 6,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '5',
      title: 'Monthly Team Building Event',
      summary: 'Join us for our monthly team building event this Friday! Activities include mini golf, team challenges, and networking.',
      content: 'Full article content here...',
      category: 'events',
      author: 'Events Committee',
      publishedDate: '2023-05-01',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 23,
      comments: 9,
      isLiked: false,
      isBookmarked: false
    }
  ];
  
  const categories = ['all', 'company', 'hr', 'achievement', 'office', 'events'];
  
  // Filter news based on selected category
  const filteredNews = news.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleLike = (id: string) => {
    console.log('Like news:', id);
  };
  
  const handleComment = (id: string) => {
    console.log('Comment on news:', id);
  };
  
  const handleShare = (id: string) => {
    console.log('Share news:', id);
  };
  
  const handleBookmark = (id: string) => {
    console.log('Bookmark news:', id);
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar title="Company News" />
      
      <View style={styles.container}>
        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive
                ]}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* News Feed */}
        <ScrollView style={styles.newsFeed} showsVerticalScrollIndicator={false}>
          {filteredNews.map(article => (
            <NewsCard
              key={article.id}
              article={article}
              onLike={() => handleLike(article.id)}
              onComment={() => handleComment(article.id)}
              onShare={() => handleShare(article.id)}
              onBookmark={() => handleBookmark(article.id)}
              onPress={() => console.log('View article:', article.id)}
            />
          ))}
          
          {filteredNews.length === 0 && (
            <View style={styles.emptyContainer}>
              <Newspaper size={64} color={colors.gray[300]} />
              <Text style={styles.emptyTitle}>No news found</Text>
              <Text style={styles.emptyText}>
                {selectedCategory === 'all' 
                  ? "No news articles available at the moment" 
                  : `No ${selectedCategory} news found`
                }
              </Text>
            </View>
          )}
          
          <View style={styles.footer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  container: {
    flex: 1,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  categoryChipActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  categoryChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  newsFeed: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[700],
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    maxWidth: '80%',
  },
  footer: {
    height: 24,
  },
});