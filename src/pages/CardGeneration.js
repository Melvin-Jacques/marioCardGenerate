import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CardCarousel = () => {
  const [shuffledData, setShuffledData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationValue] = useState(new Animated.Value(0));
  const [isRunning, setIsRunning] = useState(true);
  const [showDescription, setShowDescription] = useState(false);


  const data = [
    {
      id: '1',
      name: 'Bois Rieur de Méga Wiggler',
      description: "Une forêt pleine de surprises.",
      boardView: require('../../assets/board-view/super-mario-party-jamboree-website-board-1.jpg'),
      boardIcon: require('../../assets/board-icons/super-mario-party-jamboree-board-icon-1.png'),
    },
    {
      id: '2',
      name: 'Circuit Débridé',
      description: "Un parcours rapide et intense.",
      boardView: require('../../assets/board-view/super-mario-party-jamboree-website-board-2.jpg'),
      boardIcon: require('../../assets/board-icons/super-mario-party-jamboree-board-icon-2.png'),
    },
    {
      id: '3',
      name: 'Île Goomba',
      description: "L'endroit préféré des Goombas !",
      boardView: require('../../assets/board-view/super-mario-party-jamboree-website-board-3.jpg'),
      boardIcon: require('../../assets/board-icons/super-mario-party-jamboree-board-icon-3.png'),
    },
  ];

  useEffect(() => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setShuffledData(shuffled);

    const interval = setInterval(() => {
      if (isRunning) {
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          animationValue.setValue(0);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffled.length);
        });
      }
    }, 200);

    const stopCarouselTimeout = setTimeout(() => {
      setIsRunning(false);
      setShowDescription(true);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopCarouselTimeout);
    };
  }, [isRunning]);

  const animatedCardStyle = {
    opacity: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.5],
    }),
    transform: [
      {
        scale: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {shuffledData.length > 0 && (
        <>
          <Image
            source={shuffledData[currentIndex].boardView}
            style={styles.backgroundImage}
            blurRadius={12}
          />
          <View
            style={[
              styles.carousel,
              { justifyContent: isRunning ? 'space-between' : 'center' },
            ]}
          >
            {isRunning && (
              <Animated.View style={[styles.card, animatedCardStyle]}>
                <Image source={shuffledData[(currentIndex + 1) % shuffledData.length].boardIcon} style={styles.smallCard} />
              </Animated.View>
            )}

            <Animated.View style={[styles.mainCard, animatedCardStyle]}>
              <Image source={shuffledData[currentIndex].boardIcon} style={styles.mainCardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{shuffledData[currentIndex].name}</Text>
                {showDescription && (
                  <Text style={styles.cardDescription}>
                    {shuffledData[currentIndex].description}
                  </Text>
                )}
              </View>
            </Animated.View>

            {isRunning && (
              <Animated.View style={[styles.card, animatedCardStyle]}>
                <Image source={shuffledData[(currentIndex + 2) % shuffledData.length].boardIcon} style={styles.smallCard} />
              </Animated.View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  carousel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  card: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  mainCard: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  smallCard: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  mainCardImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  cardInfo: {
      alignItems: 'center',
      marginTop: 10,
  },
  cardName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDescription: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CardCarousel;
