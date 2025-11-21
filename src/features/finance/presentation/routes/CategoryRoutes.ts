import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetCategoriesUseCase } from "../../application/useCases/categories/GetCategoriesUseCase";
import { CategoryController } from "../controllers/CategoryController";
import authValidation from "../../../../middleware/authValidation";

const CategoryRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getCategoriesUseCase = new GetCategoriesUseCase(financeRepository);
  const categoryController = new CategoryController(getCategoriesUseCase);

  app.get(
    "/categories",
    {
      preHandler: [authValidation],
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return categoryController.getCategories(req, reply);
    }
  );

  app.get("/palettes", async (req: FastifyRequest, reply: FastifyReply) => {
    const darkPalette = {
      mode: "dark",
      beige100: {
        main: "#EAE2D7",
        light: "#F1E9DD",
        dark: "#B9B1A7",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      beige500: {
        main: "#B89A7A",
        light: "#D1B694",
        dark: "#8C7158",
        contrastText: "#fff",
      },
      grey100: {
        main: "#E0E0E0",
        light: "#EBEBEB",
        dark: "#A6A6A6",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      grey300: {
        main: "#9E9E9E",
        light: "#BDBDBD",
        dark: "#757575",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      grey500: {
        main: "#555555",
        light: "#767676",
        dark: "#333333",
        contrastText: "#fff",
      },
      grey900: {
        main: "#18181C",
        light: "#3C3C42",
        dark: "#0F0F12",
        contrastText: "#fff",
      },
      green: {
        main: "#2E8B57",
        light: "#58B27F",
        dark: "#1D5D3C",
        contrastText: "#fff",
      },
      yellow: {
        main: "#FFD580",
        light: "#FFE6A8",
        dark: "#CFA34E",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      cyan: {
        main: "#4FBBC3",
        light: "#88E0E8",
        dark: "#32888E",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      navy: {
        main: "#50597B",
        light: "#757FA3",
        dark: "#2F3551",
        contrastText: "#fff",
      },
      red: {
        main: "#D9534F",
        light: "#E68580",
        dark: "#A73734",
        contrastText: "#fff",
      },
      purpleSecondary: {
        main: "#9C88C8",
        light: "#BDA9E4",
        dark: "#705D96",
        contrastText: "#fff",
      },
      purpleTertiary: {
        main: "#C084B8",
        light: "#D7A9CE",
        dark: "#8B5A85",
        contrastText: "#fff",
      },
      turquoise: {
        main: "#4E9E9E",
        light: "#7EC4C4",
        dark: "#347373",
        contrastText: "#fff",
      },
      brown: {
        main: "#A97463",
        light: "#C69A8C",
        dark: "#784C3D",
        contrastText: "#fff",
      },
      magenta: {
        main: "#A04E7C",
        light: "#C67EA3",
        dark: "#6D3556",
        contrastText: "#fff",
      },
      blue: {
        main: "#437DBF",
        light: "#78A7E6",
        dark: "#2E5689",
        contrastText: "#fff",
      },
      navyGrey: {
        main: "#9AA4B3",
        light: "#C2CBD8",
        dark: "#6B7483",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      armyGreen: {
        main: "#758C69",
        light: "#A3B597",
        dark: "#506243",
        contrastText: "#fff",
      },
      gold: {
        main: "#D6B85F",
        light: "#E9D78A",
        dark: "#A4883C",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      orange: {
        main: "#D97742",
        light: "#E89F6F",
        dark: "#A3532C",
        contrastText: "#fff",
      },
      action: {
        disabled: "#B0B0B0",
        disabledBackground: "#505050",
        disabledOpacity: 1,
      },
    };

    const lightPalette = {
      mode: "light",
      beige100: {
        main: "#FFF7EB",
        light: "#FFF9EF",
        dark: "#E0D3B8",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      beige500: {
        main: "#C2A37E",
        light: "#D9BA96",
        dark: "#9B7C59",
        contrastText: "#fff",
      },
      grey100: {
        main: "#F5F5F5",
        light: "#FAFAFA",
        dark: "#CCCCCC",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      grey300: {
        main: "#B0B0B0",
        light: "#CCCCCC",
        dark: "#8A8A8A",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      grey500: {
        main: "#6E6E6E",
        light: "#8C8C8C",
        dark: "#4A4A4A",
        contrastText: "#fff",
      },
      grey900: {
        main: "#1E1E22",
        light: "#55555A",
        dark: "#121216",
        contrastText: "#fff",
      },
      green: {
        main: "#4CA36E",
        light: "#75C794",
        dark: "#2E6E48",
        contrastText: "#fff",
      },
      yellow: {
        main: "#F8D47A",
        light: "#FAE49E",
        dark: "#C5A851",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      cyan: {
        main: "#70C9C2",
        light: "#A2E4DE",
        dark: "#4A9D97",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      navy: {
        main: "#5E6F8A",
        light: "#8A9CBF",
        dark: "#3B4B65",
        contrastText: "#fff",
      },
      red: {
        main: "#D94E48",
        light: "#E97A74",
        dark: "#A5302A",
        contrastText: "#fff",
      },
      purpleSecondary: {
        main: "#9E7BC6",
        light: "#BCA2E0",
        dark: "#6F5695",
        contrastText: "#fff",
      },
      purpleTertiary: {
        main: "#C18FC1",
        light: "#D9B2D9",
        dark: "#8E648E",
        contrastText: "#fff",
      },
      turquoise: {
        main: "#639F9F",
        light: "#92C2C2",
        dark: "#416E6E",
        contrastText: "#fff",
      },
      brown: {
        main: "#A3745B",
        light: "#C59B83",
        dark: "#734C3A",
        contrastText: "#fff",
      },
      magenta: {
        main: "#A24D7A",
        light: "#C67CA3",
        dark: "#713654",
        contrastText: "#fff",
      },
      blue: {
        main: "#4A8DC8",
        light: "#79B2E4",
        dark: "#2E6496",
        contrastText: "#fff",
      },
      navyGrey: {
        main: "#9DA6B5",
        light: "#C2CAD8",
        dark: "#6F7785",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      armyGreen: {
        main: "#879B6A",
        light: "#AFC193",
        dark: "#5F6F46",
        contrastText: "#fff",
      },
      gold: {
        main: "#D8C15A",
        light: "#EAD987",
        dark: "#A4933B",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      orange: {
        main: "#E08145",
        light: "#EBA676",
        dark: "#A75A2E",
        contrastText: "#fff",
      },
      action: {
        disabled: "#BDBDBD",
        disabledBackground: "#E0E0E0",
        disabledOpacity: 1,
      },
    };

    const themes = {
      darkPalette: darkPalette,
      lightPalette: lightPalette,
    };
    return reply.status(200).send(themes);
  });
};

export default CategoryRoutes;
