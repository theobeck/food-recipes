import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import RecipeListItem from '../RecipeItem';
import Pagination from '../Pagination';
import RECIPES from './queries';
import { useSearchParams } from 'react-router-dom';

interface Reviews {
  rating: number;
  comment: string;
}

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  reviews: Reviews[];
}

interface RecipeListProps {
  selectedSort: string;
  tags: string[];
  searchTerm: string;
  itemsPerPage: number;
}

const RecipeList: React.FC<RecipeListProps> = ({ selectedSort, tags, searchTerm, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterChanged, setFilterChanged] = useState<boolean>(false);

  const { loading, error, data } = useQuery(RECIPES, {
    variables: { 
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
      sort: selectedSort,
      tags,
      searchTerm
    },
  });

  useEffect(() => {
    if (data && data.getRecipes && 'totalCount' in data.getRecipes) {
      setTotalRecipes(data.getRecipes.totalCount);
    }
  }, [data]);

  useEffect(() => {
    // Set filterChanged flag when sort, tags, or searchTerm changes
      setFilterChanged(true);
  }, [selectedSort, tags, searchTerm]);
  
  useEffect(() => {
    if (filterChanged) {
      setSearchParams({ page: '1' });
      setFilterChanged(false); // Reset the flag after setting search params
    } else {
      const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
      if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
        setCurrentPage(pageFromUrl);
      }
    }
  }, [searchParams, setSearchParams, filterChanged]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage.toString() });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes: Recipe[] = data?.getRecipes?.recipes ?? [];

  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        recipes.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)
      )}
      <Pagination
        total={totalRecipes}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setPage={handlePageChange}
      />
    </div>
  );
};

export default RecipeList;
