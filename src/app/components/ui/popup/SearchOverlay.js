// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Title from '../textual/Title';
// import Stack from '../wrapper/Stack';
// import InvisibleLink from '../button/InvisibleLink';
// import Section from '../wrapper/Section';
// import Text from '../textual/Text';
// import FormError from '../form/formError';
// import Chip from '../textual/Chip';
// import TextInput from '../form/TextInput';
// import { PiClock } from 'react-icons/pi';
// import { generateClient } from 'aws-amplify/api';
// import { listRecipes } from '@/graphql/customQueries';
// import { useUser } from '@/utils/UserContext';
// import { getS3Path } from '@/utils/getS3Path';

// const client = generateClient();

// const OverlayWrapper = styled.div`
//   position: fixed;
//   transition: 0.3s;
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
//   align-items: center;
//   justify-content: center;
//   top: 0;
//   left: 0;
//   transform: ${props => props.$showOverlay ? 'translateY(0%)' : 'translateY(-100%)'};
//   visibility: ${props => props.$showOverlay ? 'visible' : 'hidden'};
//   width: 100%;
//   height: 100%;
//   background-color: var(--bg-color);
//   z-index: 1000;
//   padding: 15px;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: transparent;
//   border: none;
//   color: var(--paragraph);
//   font-size: 20px;
//   cursor: pointer;
// `;

// const SearchInput = styled.input`
//   padding: 10px;
//   border: 1px solid var(--border-color);
//   border-radius: 5px;
//   width: 100%;
//   margin-bottom: 10px;
//   font-size: 20px;
// `;

// const ResultItem = styled.li`
//   margin-bottom: 10px;
//   list-style: none;
//   padding: 10px 14px;
//   border-radius: 5px;
//   transition: 0.3s;

//   &:hover {
//     background: var(--secondary-bg-color);
//   }
// `;

// const SearchResult = styled.ul`
//   margin-bottom: 10px;
//   list-style: none;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   padding: 15px;
//   border-radius: 5px;
//   border: 2px solid var(--grey-color);
// `;

// const RecipeImage = styled.img`
//   width: 150px;
//   height: 80px;
//   margin-right: 10px;
//   border-radius: 5px;
//   object-fit: cover;
// `;

// function SearchOverlay({ showOverlay, onClose }) {
//   const { isLoggedIn } = useUser();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(0);

//   useEffect(() => {
//     return () => {
//       clearTimeout(typingTimeout);
//     };
//   }, [typingTimeout]);

//   const handleSearchChange = (event) => {
//     const title = event.target.value;
//     setSearchQuery(title);

//     clearTimeout(typingTimeout);
//     setLoading(false);
//     setSearching(true);

//     if (title.trim().length > 0) {
//       setTypingTimeout(setTimeout(() => {
//         setLoading(true);
//         fetchResults(title.trim().toLowerCase());
//         setSearching(false);
//       }, 1000));
//     } else {
//       setSearchResults([]);
//       setSearching(false);
//     }
//   };

//   const fetchResults = async (title) => {
//     const filter = {
//       filter: {
//         title: {
//           contains: title
//         }
//       },
//       limit: 10
//     };

//     try {
//       const recipeResult = await client.graphql({
//         query: listRecipes,
//         authMode: isLoggedIn ? "userPool" : "identityPool",
//         variables: filter
//       });

//       const recipes = recipeResult.data.listRecipes.items;

//       const recipesWithImages = await Promise.all(
//         recipes.map(async (recipe) => {
//           let imageUrl = '';
//           let profileUrl = '';
//           if (recipe.image) {
//             const imageUrlObject = await getS3Path(recipe.image);
//             imageUrl = imageUrlObject.href;
//           }

//           if (recipe.user?.avatar) {
//             const imageUrlObject = await getS3Path(recipe.user.avatar);
//             profileUrl = imageUrlObject.href;
//           }
//           return {
//             ...recipe,
//             imageUrl,
//             profileUrl
//           };
//         })
//       );
//       setSearchResults(recipesWithImages);
//       setLoading(false);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des résultats de recherche :', error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <OverlayWrapper $showOverlay={showOverlay}>
//       <Section>
//         <CloseButton onClick={onClose}>Fermer</CloseButton>
//         <Stack direction="column">
//           <Title level={3}>Recherche de Recettes</Title>
//           <TextInput
//             type="text"
//             label="Rechercher une recette"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           {loading && <Text>Chargement...</Text>}
//           {!loading && searchResults.length === 0 && !searching && searchQuery.length > 0 && (
//             <FormError variant="error">Aucun résultat trouvé pour &quot;{searchQuery}&quot;</FormError>
//           )}
//           {searchResults.length > 0 && (
//             <SearchResult>
//               <Chip variant="success">
//                 {searchResults.length} résultat{searchResults.length <= 1 ? '' : 's'} :
//               </Chip>
//               {searchResults.map((recipe, index) => {
//                 const steps = recipe.steps ? JSON.parse(recipe.steps) : [];
//                 const totalDuration = steps.reduce((total, step) => total + parseInt(step.duration, 10), 0);

//                 return (
//                   <ResultItem key={recipe.id ?? index}>
//                     <InvisibleLink onClick={onClose} href={`/${recipe.user?.pseudo}/${recipe.slug}`}>
//                       <Stack align="center">
//                         <RecipeImage src={recipe.imageUrl} alt={recipe.title} />
//                         <Stack direction="column" spacing="0px" width={"100%"}>
//                           <Stack justify="space-between">
//                             <Stack align="center" spacing="6px">
//                               <Text size="lg" fontfamily="semi-bold" variant="contrasted">{recipe.title}</Text>
//                               {recipe.user?.avatar && (
//                                 <img src={recipe.profileUrl} className='user-picture-min' alt={recipe.user?.pseudo} />
//                               )}
//                               <Text size="sm">de {recipe.user?.pseudo}</Text>
//                             </Stack>
//                             <Chip icon={PiClock} variant="success">{totalDuration} minutes</Chip>
//                           </Stack>
//                           <Text size="sm">{recipe.description}</Text>
//                         </Stack>
//                       </Stack>
//                     </InvisibleLink>
//                   </ResultItem>
//                 );
//               })}
//             </SearchResult>
//           )}
//         </Stack>
//       </Section>
//     </OverlayWrapper>
//   );
// }

// export default SearchOverlay;
